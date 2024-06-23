import React, { useState } from 'react'
import "./index.scss"
import { editProfile } from '../../../api/FirestoreAPI'
import user from "../../../assets/user.png"
import user1 from "../../../assets/user1.svg"
import user2 from "../../../assets/user2.svg"
import user3 from "../../../assets/user3.svg"
import user4 from "../../../assets/user4.svg"
import user5 from "../../../assets/user5.svg"
import user6 from "../../../assets/user6.svg"

export default function EditProfile({ currentUser, onEdit }) {
  const [editInputs, setEditInputs] = useState({})
  const getInput = (event) => {
    let { name, value } = event.target
    let input = { [name]: value }
    setEditInputs({...editInputs, ...input})
  }

  const updateProfileData = () => {
    editProfile(currentUser?.userID, editInputs)
    onEdit()
  }

  // manage tutoring button
  const [wantsToTutor, setWantsToTutor] = useState(false)
  const manageClickForWantToTutor = () => {
    setWantsToTutor(!wantsToTutor)
    setEditInputs((prevInputs) => ({
      ...prevInputs,
      wantsToTutor: !wantsToTutor
    }));
  }

  // manage befriending button
  const [wantsToBefriend, setWantsToBefriend] = useState(false)
  const manageClickForWantToBefriend = () => {
    setWantsToBefriend(!wantsToBefriend)
    setEditInputs((prevInputs) => ({
      ...prevInputs,
      wantsToBefriend: !wantsToBefriend
    }));
  }

  // manage avatar-choice buttons
  const [pickedOne, setPickedOne] = useState(false);
  const [pickedTwo, setPickedTwo] = useState(false);
  const [pickedThree, setPickedThree] = useState(false);
  const [pickedFour, setPickedFour] = useState(false);
  const [pickedFive, setPickedFive] = useState(false);
  const [pickedSix, setPickedSix] = useState(false);
  const [pickedSeven, setPickedSeven] = useState(false);

  const manageClickForAvatar1 = () => {
      setPickedOne(true);
      setPickedTwo(false);
      setPickedThree(false);
      setPickedFour(false);
      setPickedFive(false);
      setPickedSix(false);
      setPickedSeven(false);
      setEditInputs((prevInputs) => ({
          ...prevInputs,
          avatar: user
      }));
  }

  const manageClickForAvatar2 = () => {
      setPickedOne(false);
      setPickedTwo(true);
      setPickedThree(false);
      setPickedFour(false);
      setPickedFive(false);
      setPickedSix(false);
      setPickedSeven(false);
      setEditInputs((prevInputs) => ({
          ...prevInputs,
          avatar: user1
      }));
  }

  const manageClickForAvatar3 = () => {
      setPickedOne(false);
      setPickedTwo(false);
      setPickedThree(true);
      setPickedFour(false);
      setPickedFive(false);
      setPickedSix(false);
      setPickedSeven(false);
      setEditInputs((prevInputs) => ({
          ...prevInputs,
          avatar: user2
      }));
  }

  const manageClickForAvatar4 = () => {
      setPickedOne(false);
      setPickedTwo(false);
      setPickedThree(false);
      setPickedFour(true);
      setPickedFive(false);
      setPickedSix(false);
      setPickedSeven(false);
      setEditInputs((prevInputs) => ({
          ...prevInputs,
          avatar: user3
      }));
  }

  const manageClickForAvatar5 = () => {
      setPickedOne(false);
      setPickedTwo(false);
      setPickedThree(false);
      setPickedFour(false);
      setPickedFive(true);
      setPickedSix(false);
      setPickedSeven(false);
      setEditInputs((prevInputs) => ({
          ...prevInputs,
          avatar: user4
      }));
  }

  const manageClickForAvatar6 = () => {
      setPickedOne(false);
      setPickedTwo(false);
      setPickedThree(false);
      setPickedFour(false);
      setPickedFive(false);
      setPickedSix(true);
      setPickedSeven(false);
      setEditInputs((prevInputs) => ({
          ...prevInputs,
          avatar: user5
      }));
  }

  const manageClickForAvatar7 = () => {
      setPickedOne(false);
      setPickedTwo(false);
      setPickedThree(false);
      setPickedFour(false);
      setPickedFive(false);
      setPickedSix(false);
      setPickedSeven(true);
      setEditInputs((prevInputs) => ({
          ...prevInputs,
          avatar: user6
      }));
  }

  console.log(editInputs)
  return (
    <div className='card'>
      <div className='edit-button'>
        <button onClick={onEdit}>Return</button>
      </div>

      <div>Pick your avatar:
        <div>
          <button
              className="avatar-button"
              onClick={manageClickForAvatar1}
              style = {{backgroundColor: pickedOne ? "pink" : "white"}}>
            <img src={user} width={80}/>
          </button>
          <button
              className="avatar-button"
              onClick={manageClickForAvatar2}
              style = {{backgroundColor: pickedTwo ? "pink" : "white"}}>
              <img src={user1} width={80}/>
          </button>
          <button
              className="avatar-button"
              onClick={manageClickForAvatar3}
              style = {{backgroundColor: pickedThree ? "pink" : "white"}}>
              <img src={user2} width={80}/>
          </button>
          <button
              className="avatar-button"
              onClick={manageClickForAvatar4}
              style = {{backgroundColor: pickedFour ? "pink" : "white"}}>
              <img src={user3} width={80}/>
          </button>
          <button
              className="avatar-button"
              onClick={manageClickForAvatar5}
              style = {{backgroundColor: pickedFive ? "pink" : "white"}}>
              <img src={user4} width={80}/>
          </button>
            <button
            className="avatar-button"
            onClick={manageClickForAvatar6}
            style = {{backgroundColor: pickedSix ? "pink" : "white"}}>
                <img src={user5} width={80}/>
            </button>
            <button
            className="avatar-button"
            onClick={manageClickForAvatar7}
            style = {{backgroundColor: pickedSeven ? "pink" : "white"}}>
                <img src={user6} width={80}/>
            </button>
        </div>
    </div>

  <div className='input'>
        <input 
          onChange={getInput}
          className="each" 
          placeholder='Name'
          name="name"
        />

        <input 
          onChange={getInput}
          className="each" 
          placeholder='Year of Study' 
          name = 'year'
        />

        <input 
          onChange={getInput}
          className="each" 
          placeholder='Major' 
          name = "major"
        />

        <input 
          onChange={getInput}
          className="each" 
          placeholder='Hobby (in one word...)'
          name = "hobby"
        />

        <input 
          onChange={getInput}
          className="each" 
          placeholder='Tagline' 
          name = "tagline"
        />


        <div>Tell us why you're using NUSConnect:
          <div className="fine-print">You can always turn these options off if you think you need a break.</div>
          <div>
            <button
                onClick={manageClickForWantToBefriend}
                className="options-button"
                style={{backgroundColor: wantsToBefriend ? 'lightgreen' : '#108672'}}
            >
              <input
                  className="indicator-checkbox"
                  type="checkbox"
                  checked={wantsToBefriend ? wantsToBefriend : false}
              />
              To make new connections
            </button>
          </div>
          <div>
            <button
                onClick={manageClickForWantToTutor}
                className="options-button"
                style={{backgroundColor: wantsToTutor ? 'lightgreen' : '#108672'}}
            >
              <input
                  className="indicator-checkbox"
                  type="checkbox"
                  checked={wantsToTutor ? true : false} />
              To be a volunteer tutor
            </button>
          </div>
        </div>

        <div>If you want to become a volunteer tutor, tell us which module you would like to tutor:</div>
        <input
            onChange={getInput}
            className="each"
            placeholder='Module Code(Omit spacing)'
            name = "Module Code"
        />
      </div>

      <button className='save' onClick={updateProfileData}>
        Save
      </button>
    </div>
  )
}
