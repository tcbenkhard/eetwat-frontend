#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EetwatFrontendStack } from '../lib/eetwat-frontend-stack';

const app = new cdk.App();
new EetwatFrontendStack(app, 'eetwat-frontend-tst', {
    environment: 'tst',
    serviceName: 'eetwat'
});

new EetwatFrontendStack(app, 'eetwat-frontend-prd', {
    environment: 'prd',
    serviceName: 'eetwat'
});