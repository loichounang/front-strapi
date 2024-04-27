import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { globalConfig } from 'config';

interface ServiceParams {
    typeService?: string;
    [key: string]: string | undefined;
}

interface ServiceContent {
    __Id: string;
    titrePrincipal: string;
    titre: string;
    titreSecondaire: string;
    imagePoseGel: string;
    imagePoseGel_Url: string;
    
}

const Service: React.FC = () => {
    const params = useParams<ServiceParams>();
    const [serviceContent, setServiceContent] = useState<ServiceContent[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.typeService) {
                    const response = await axios.get<ServiceContent[]>(`http://skrapi-api.univ-soft.com/api/production/content/v1/f3253854h70hadmlairiyauvwx/Services${params.typeService}/get-contents`);
                    setServiceContent(response.data);
                }
            } catch (error) {
                console.error('Error fetching service content:', error);
            }
        };

        fetchData();
    }, [params.typeService]);

    return (
        <div>
            {serviceContent.map(item => (
                <div key={item.__Id}>
                    <h1>{item.titrePrincipal}</h1>
                    <p>{item.titreSecondaire}</p>
                    <p>{item.titre}</p>
                    <img src={`${globalConfig.get().apiUrl}/download/${item.imagePoseGel_Url}`} alt="Image Pose Gel" />
                    
                </div>
            ))}
        </div>
    );
};

export default Service;
