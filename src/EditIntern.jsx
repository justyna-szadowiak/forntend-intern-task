import React, { useEffect, useState } from "react";
import './EditIntern.css';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button, Form } from 'semantic-ui-react';

const EditIntern = () => {
    const { id } = useParams();
    const { register, setValue, handleSubmit, getValues, formState: { errors } } = useForm({ shouldUseNativeValidation: false });
    const [isDateError, setIsDateError] = useState();

    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const sizes = ['big'];

    const onSubmit = (newIntern, event) => {
        if(event) {
            event.preventDefault();
            checkDates();
            if(!isDateError){ 
                console.log(newIntern);
            }
        }
    }

    const checkDates = () => {
        const internshipStart = new Date(getValues("internshipStart"));
        const internshipEnd = new Date(getValues("internshipEnd"));
        const daysBetween = (internshipEnd.getTime() - internshipStart.getTime()) / (1000 * 3600 * 24);
        setIsDateError(daysBetween <= 0);
    }

    useEffect(() => {
        const fetchIntern = async () => {
            const response = await fetch(`http://localhost:3001/interns/${id}`);
            const intern = await response.json();
            setValue("name", intern.name);
            setValue("email", intern.email);
            setValue("internshipStart", intern.internshipStart.slice(0, 10));
            setValue("internshipEnd", intern.internshipEnd.slice(0, 10));
        }
        fetchIntern();
    });

    return (
        <div>
            <div className="backToList">
                <img src={require('./img/icons/left-arrow.png')} alt="Back to participant list" className="backToListIcon"/>
                <NavLink to="/" className="backToListLink">Back to list</NavLink>
            </div>
            {sizes.map((size) =>
                <Form 
                    className="editForm" 
                    size={size} 
                    key={size}
                    onSubmit={handleSubmit(onSubmit)}
                >
                <h1 className="headerEditForm">Edit</h1>
                    <Form.Field>
                        <label className="nameLabel">Full name *</label>
                        <input 
                            className="nameInputBox"
                            type="text" 
                            name="name"
                            {...register("name",
                            { required: "Please enter your first name."})}
                        />
                        {errors.name && errors.name.type === "required" && <p className="error">This field is required</p>}
                    </Form.Field>
                    <Form.Field>
                        <label className="emailLabel">Email address *</label>
                        <input 
                            className="emailInputBox"
                            name="email"
                            {...register("email",
                            { required: true, 
                                pattern: {
                                    value: emailRegexp,
                                    message: 'Email is not correct'
                            }})}
                        />
                        
                        {errors.email && errors.email.message && <p className="error">{errors.email.message} </p>}
                        {errors.email && errors.email.type === "required" && <p className="error">This field is required </p>}
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="startLabel">Intenship start *</label>
                            <input 
                                className="startInputBox"
                                type="date" 
                                name="internshipStart"
                                {...register("internshipStart",
                                {required: true})}
                            />
                            {errors.internshipStart && errors.internshipStart.type === "required" && <p className="error">This field is required</p>}
                        </Form.Field>
                        <Form.Field>
                            <label className="endLabel">Internship end *</label>
                            <input 
                                className="endInputBox"
                                type="date" 
                                name="internshipEnd"
                                {...register("internshipEnd",
                                {required: true})}
                            />
                            {errors.internshipEnd && errors.internshipEnd.type === "required" && <p className="error">This field is required</p>}
                        </Form.Field>
                    </Form.Group>

                    {isDateError && <p className="error">This dates is not correct</p>}

                    <Form.Field>
                        <Button type="submit" content="Secondary" className="buttonSubmit" secondary>Submit</Button>
                    </Form.Field>
                </Form>
            )}
        </div>
    );
};

export default EditIntern;