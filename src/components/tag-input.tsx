import './tag-input.scss';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

interface TagInputProps {
    tags: string[]
    setTags: (tags: string[]) => void
}

const TagInput = (props: TagInputProps) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEvent = e.nativeEvent as InputEvent;
        console.log(inputEvent);
        if(inputEvent.data === ' ' && value !== '') {
            props.setTags([...props.tags, value.toLowerCase()])
            setValue('');
        } else if(inputEvent.data !== ' ') {
            setValue(e.target.value);
        }
    }

    const deleteTag = (index: number) => {
        const newTags = [...props.tags];
        newTags.splice(index, 1);
        props.setTags(newTags);
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter' && value !== '') {
            props.setTags([...props.tags, value.toLowerCase()])
            setValue('');
            e.preventDefault();
        }
    }

    return (
        <div className={'tags'}>
            <input type={"text"} onChange={handleChange} onKeyDown={handleKeyPress} value={value} placeholder={'Tags'}/>
            <div className={'tags-current'} style={{ display: props.tags.length > 0 ? 'inherit' : 'none'}}>
                {props.tags?.map((tag, index) => <span className={'mealtag'} onClick={() => deleteTag(index)}>{tag}&nbsp;<FontAwesomeIcon icon={faTimes}/></span>)}
            </div>
        </div>
    )
}

export default TagInput;