import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface EetwatFrontendStackProps extends cdk.StackProps {
    environment: 'tst' | 'prd',
    serviceName: string
}

export class EetwatFrontendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EetwatFrontendStackProps) {
        super(scope, id, props);

        const hostnames = {
            tst: `${props.serviceName}-tst.benkhard.com`,
            prd: `${props.serviceName}.benkhard.com`
        }

        const WEB_APP_DOMAIN = hostnames[props.environment];

        const hostedZoneId = ssm.StringParameter.valueForStringParameter(this, '/com/benkhard/public-hosted-zone-id');
        const zone = route53.HostedZone.fromHostedZoneAttributes(this, 'Zone', {
            hostedZoneId: hostedZoneId,
            zoneName: 'benkhard.com'
        })

        const siteBucket = new s3.Bucket(this, "SiteBucket", {
            bucketName: WEB_APP_DOMAIN,
            websiteIndexDocument: "index.html",
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        })

        const certificateArn = ssm.StringParameter.valueForStringParameter(this, '/com/benkhard/wildcard-certificate-cloudfront');
        const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', certificateArn);

        const siteDistribution = new cloudfront.CloudFrontWebDistribution(this, "SiteDistribution", {
            originConfigs: [{
                customOriginSource: {
                    domainName: siteBucket.bucketWebsiteDomainName,
                    originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
                },
                behaviors: [{
                    isDefaultBehavior: true
                }]
            }],
            viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
                aliases: [WEB_APP_DOMAIN],
            })
        });

        new route53.ARecord(this, "SiteRecord", {
            recordName: WEB_APP_DOMAIN,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(siteDistribution)),
            zone
        });

        new deploy.BucketDeployment(this, "Deployment", {
            sources: [deploy.Source.asset("../build")],
            destinationBucket: siteBucket,
            distribution: siteDistribution,
            distributionPaths: ["/*"]
        });

    }
}
