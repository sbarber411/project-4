import React, { useState } from 'react';
import { Button, Form, TextArea, Header } from 'semantic-ui-react';
import "./AddTrip.css";

export default function AddTrip({ handleAddTrip }) {
    const [tripForm, setTripForm] = useState({
        category: "",
        location: "",
        title: "",
        text: "",
    });

    const categoryOptions = [
        {
            key: 'Restaurant/Bar Review',
            text: 'Restaurant/Bar Review',
            value: 'Restaurant/Bar Review',
        },
        {
            key: 'Accommodations Review',
            text: 'Accommodations Review',
            value: 'Accommodations Review',
        },
        {
            key: 'Excursions Review',
            text: 'Excursions Review',
            value: 'Excursions Review',
        },
        {
            key: 'Miscellaneous Review',
            text: 'Miscellaneous Review',
            value: 'Miscellaneous Review',
        },
    ]

    const [selectedFile, setSelectedFile] = useState("");

    function handleFileInput(e) {
        console.log(e.target.files, " < - this is e.target.files");
        setSelectedFile(e.target.files[0]);
    }

    function handleChange(e) {
        setTripForm({
            ...tripForm,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("category", tripForm.category);
        formData.append("location", tripForm.location);
        formData.append("title", tripForm.title);
        formData.append("text", tripForm.text);
        handleAddTrip(formData); 
    }

    return (
        <div className="form-container">
            <Header as="h2" color='orange' textAlign="center">
            The whole world awaits! 
            </Header>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Select
                        placeholder='Select Category'
                        fluid
                        selection
                        className="form-input"
                        value={tripForm.category}
                        onChange={(e, data) => setTripForm({...tripForm, category:data.value})}
                        options={categoryOptions}
                    />
                    <Form.Input
                        className="form-input"
                        name="location"
                        value={tripForm.location}
                        placeholder="Enter destination"
                        onChange={handleChange}
                        fluid
                        required
                    />
                </Form.Group>
                <Form.Input
                    className="form-input"
                    name="title"
                    value={tripForm.title}
                    placeholder="Enter title"
                    style={{ width: 542, textOverflow: 'ellipsis !important'}}
                    onChange={handleChange}
                    inline
                    required
                />
                <TextArea
                    className="textarea"
                    name="text"
                    value={tripForm.text}
                    placeholder="Tell us more about your trip..."
                    style={{ minHeight: 200, textOverflow: 'ellipsis !important'}}
                    onChange={handleChange}
                />
                <Form.Input
                    className="form-control"
                    type="file"
                    name="photo"
                    label="Upload Image"
                    placeholder="upload image"
                    style={{ width: 417, margin: 12 }}
                    onChange={handleFileInput}
                    inline
                    required
                />
                <Button
                    color="orange"
                    fluid
                    size="large"
                    type="submit"
                    className="btn"
                >
                    Add your review!
                </Button>
            </Form>
        </div >
    )
}