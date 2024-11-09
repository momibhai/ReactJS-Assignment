import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { toast } from 'react-toastify'; // To show notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const UserCreate = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // State for loading spinner (when submitting the form)
  const [loading, setLoading] = useState(false);

  // Use navigate hook for routing
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    console.log("FormData submitted:", formData); // Check what data is being sent

    try {
      // Send POST request to backend using fetch
      const response = await fetch('https://laravelreactjs.webmair.dev/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that we are sending JSON
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });

      // Check if the response is not successful (non-2xx HTTP status)
      if (!response.ok) {
        // If not ok, throw an error with response status
        throw new Error('Failed to sign up');
      }

      // Parse the response data
      const data = await response.json();
      console.log("Response data:", data); // Check the response data
      toast.success("User Created Successfully!"); // Show success message

      // Handle success: Set loading to false and show success toast
      setLoading(false);

      // Redirect to /users route after success
      navigate('/users'); // This will navigate to /users page

    } catch (error) {
      // Handle errors: Set loading to false and show error toast
      setLoading(false);
      console.error("Error during signup:", error); // Log error for debugging

      // If the error is related to the fetch request
      if (error.message === 'Failed to sign up') {
        toast.error('There was an issue with your signup. Please try again.');
      } else {
        toast.error('Something went wrong. Please try again.'); // General error message
      }
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          marginTop: '50px',
          minHeight: '100vh', // Full viewport height
          backgroundColor: '#f8f9fa', // Light background for the form
        }}
      >
        <Card style={{ width: '100%', maxWidth: '600px', borderRadius: '10px' }}>
          <Card.Body>
            <h4 className="text-center" style={{ marginBottom: '30px' }}>Sign Up</h4>
            <Form onSubmit={handleSubmit}>
              {/* Name Field */}
              <Form.Group controlId="formName" style={{ marginBottom: '15px' }}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ borderRadius: '8px' }}
                />
              </Form.Group>

              {/* Email Field */}
              <Form.Group controlId="formEmail" style={{ marginBottom: '15px' }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ borderRadius: '8px' }}
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formPassword" style={{ marginBottom: '20px' }}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={{ borderRadius: '8px' }}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                }}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default UserCreate;
