import React, { useReducer } from 'react';

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
        },
    email: {
        value: '',
        error: null
        }
    };
function reducer(state, action) {
    const {name, value} = action;
    let result = validation(name, value);
    
    state = {
        ...state,
        [name]: {
            value,
            error: result ?? null,
        }

    };

    return state;
    
}
function validation(name, value) {
    let result;
    const EMAILREGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(name != "email" && value.length < 3){
        result = `${name} should be longer than 2 charactors`;
    } else if(name ==="email" && !EMAILREGEXP.test(value)) {
        result = "please enter a valid email";
    }
    return result;
}
function Example() {
    
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(name)
        dispatch({
            name,
            value
        });
    }
    console.log(state)
    return (
        <div style={{margin: 50}}>
            {/* {JSON.stringify(state)} */}

            <div>
                <label>
                    <span>First Name:</span>
                    <input
                        name="firstName"
                        value={state.firstName.value}
                        onChange={handleChange}
                    />
                    <p style={{color:'red'}}>{ state.firstName.error }</p>
                </label>
            </div>
            <div>
            <label>
                <span>Last Name:</span>
                <input
                    name="lastName"
                    value={state.lastName.value}
                    onChange={handleChange}
                />
                <p style={{color:'red'}}>{ state.lastName.error }</p>
            </label>
            </div>
            <div>
                <label>
                    <span>Email:</span>
                    <input
                        name="email"
                        value={state.email.value}
                        onChange={handleChange}
                    />
                    <p>{ state.email.error }</p>
                </label>
            </div>
        </div>
    );
}

export default Example;