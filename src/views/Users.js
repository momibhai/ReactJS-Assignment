import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Button, Modal, Spinner } from 'react-bootstrap'; // React Bootstrap components
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importing Font Awesome icons
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import '../assets/css/style.css';

const Users = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false); // For loading state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // For delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // Track user to be deleted

  const fetchData = () => {
    setLoading(true);
    axios.get('https://laravelreactjs.webmair.dev/api/users')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        toast.error('Failed to fetch users!'); // Show error toast if fetching fails
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = (userId) => {
    axios.delete(`https://laravelreactjs.webmair.dev/api/users/${userId}`)
      .then(response => {
        toast.success('User deleted successfully!'); // Success toast
        setShowDeleteConfirm(false);
        fetchData();
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
        toast.error('Failed to delete the user!'); // Error toast
      });
  };

  const editUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const updateUser = () => {
    setLoading(true);
    axios.put(`https://laravelreactjs.webmair.dev/api/users/${currentUser.id}`, currentUser)
      .then(response => {
        toast.success('User updated successfully!'); // Success toast
        setShowModal(false);
        fetchData();
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
        toast.error('Failed to update the user!'); // Error toast
      })
      .finally(() => setLoading(false));
  };

  const openDeleteConfirm = (userId) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ width: "100%", marginLeft: "10%" }} className='d-flex justify-content-center align-items-center'>
        <section className="mt-5 w-100">
          <div className="row w-100">
            <div className="col-lg-8 mx-auto">
              <div className="card w-100">
                <div className="card-body">
                  {loading ? (
                    <div className="text-center">
                      <Spinner animation="border" role="status" />
                    </div>
                  ) : (
                    <table className="table table-striped table-bordered text-center w-100">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((user, index) => (
                          <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <Button 
                                variant="danger" 
                                onClick={() => openDeleteConfirm(user.id)}
                                className="mx-2">
                                <FaTrash />
                              </Button>
                              <Button 
                                variant="warning" 
                                onClick={() => editUser(user)}
                                className="mx-2">
                                <FaEdit />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={currentUser.name || ''}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={currentUser.email || ''}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteUser(userToDelete)}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Users;
