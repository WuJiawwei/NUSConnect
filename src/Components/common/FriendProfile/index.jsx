import React, { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import "./index.scss"

const FriendProfileModal = ({ userId, onClose }) => {
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

    const { avatar, name, hobby, tagline, year } = acc;

    return (
        <div className="overlay">
            <div className="popup">
                <button className="close-button" onClick={onClose}>X</button>
                <div>
                    <div  className="friend-credentials">
                        <button className="friend-avatar-button"><img src={avatar} width={80}/></button>
                        <button className="friend-name-button">{name}</button>
                    </div>
                    <div>
                        <button className="hobby-field-button">Hobby</button>
                        <button className="friend-input-button">{hobby}</button>
                    </div>
                    <div>
                        <button className="tagline-field-button">Tagline</button>
                        <button className="friend-input-button">{tagline}</button>
                    </div>
                    <div>
                        <button className="year-field-button">Year</button>
                        <button className="friend-input-button">{year}</button>
                    </div>
                    <button className="friend-chat-button">
                        Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FriendProfileModal;