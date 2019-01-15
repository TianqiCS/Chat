
import React from 'react';

import {
    Upload, message, Button, Icon,
} from 'antd';

class FileUpload extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Dragger = Upload.Dragger;
        const props = {
            name: 'file',
            multiple: true,
            action: 'http://localhost:8000/upload',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox"/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading
                    company data or other band files</p>
            </Dragger>
        );
    }
}
export default FileUpload;