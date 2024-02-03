import React, { useEffect, useState } from 'react';


export type AdminGuidListByIdContainerProps = {
    id: string;
};

const AdminGuidListByIdContainer: React.FC<AdminGuidListByIdContainerProps> = (props) => {
    const { id }            = props;
    // get list
    const [ guid, setGuid ] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/themes/list/' + id)
            .then((data) => data.json())
            .then((item) => setGuid(item));
    }, [ id ]);

    return (
        <div>
            LIST BY ID : { id }
            {
                guid &&
                <div>
                    <div>pub: { guid['publicId'] }</div>
                    <div>tit: { guid['title'] }</div>
                    <div>url: { guid['url'] }</div>
                </div>
            }
        </div>
    );
};

export default React.memo(AdminGuidListByIdContainer);