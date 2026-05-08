import { AudioOutlined } from '@ant-design/icons';

export const VoiceRecorder = () => {

    return (
        <button
            className="box-border bg-transparent border border-input-border p-[0.7rem] flex items-center justify-center rounded-[1.25rem] transition-all duration-300 hover:bg-[#f9fafb] hover:border-primary shrink-0 cursor-pointer"
            type="button"
        >
            <AudioOutlined className="w-4 h-4" />
            <span className="ml-1 text-base font-primary">语音输入</span>
        </button>
    );
};
