import '../css/VoiceRecorder.css';
import { AudioOutlined } from '@ant-design/icons';

export const VoiceRecorder = () => {

    return (
        <button
            className='voice'
            type="button"
        >
            <AudioOutlined />
            语音输入
        </button>
    );
};
