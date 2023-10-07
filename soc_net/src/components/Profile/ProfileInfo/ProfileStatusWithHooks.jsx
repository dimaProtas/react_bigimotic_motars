import React, {useState, useEffect} from 'react';
import s from './ProfileInfo.module.css';
// import Preloader from '../../Common/Preloader/Preloader';


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(props.userId, status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
                </div>
            }

            {editMode &&
                <div className={s.statusInput}>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }

        </div>

    )
}


export default ProfileStatusWithHooks
