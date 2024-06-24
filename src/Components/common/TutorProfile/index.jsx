import React, { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import "./index.scss"

const TutorProfileModal = ({ userId, onClose }) => {
    const [acc, setAcc] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        const docRef = doc(db, 'users', userId);

        const fetchData = async () => {
            try {
                const sp = await getDoc(docRef);
                if (sp.exists()) {
                    setAcc(sp.data());
                }
            } catch (err) {
                console.error('Error fetching document:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const { avatar, name, "Module Code": moduleCode, tagline, year } = acc;

    return (
        <div className="overlay">
            <div className="popup">
                <button className="close-button" onClick={onClose}>X</button>
                <div>
                    <div  className="tutor-credentials">
                        <button className="tutor-avatar-button"><img src={avatar} width={80}/></button>
                        <button className="tutor-name-button">{name}</button>
                    </div>
                    <div>
                        <button className="module-field-button">Module</button>
                        <button className="tutor-input-button">{moduleCode}</button>
                    </div>
                    <div>
                        <button className="tagline-field-button">Tagline</button>
                        <button className="tutor-input-button">{tagline}</button>
                    </div>
                    <div>
                        <button className="year-field-button">Year</button>
                        <button className="tutor-input-button">{year}</button>
                    </div>
                    <button className="tutor-chat-button">
                        Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorProfileModal;

