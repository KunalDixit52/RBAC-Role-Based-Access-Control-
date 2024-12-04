import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Tooltip,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../index.css"; // Import global styles

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "Kunal", email: "Kunal@example.com", roles: ["Admin"] },
    { id: 2, username: "Rohan", email: "Rohan@example.com", roles: ["Editor"] },
  ]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const allRoles = ["Admin", "Editor", "Viewer"];

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpen(true);
  };

  const handleAddUser = () => {
    setCurrentUser({ id: Date.now(), username: "", email: "", roles: [] });
    setIsEditing(false);
    setOpen(true);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSave = () => {
    if (isEditing) {
      setUsers((prev) =>
        prev.map((user) => (user.id === currentUser.id ? currentUser : user))
      );
    } else {
      setUsers((prev) => [...prev, currentUser]);
    }
    setOpen(false);
  };

  return (
    <div>
      <h1>Users</h1>

         {/* Flexbox container for centering */}
         <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          {/* Search Bar */}
          <TextField
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            size="small"
            style={{
              marginBottom: "10px",
              width: "300px",
              fontSize: "16px",
            }}
          />
        </Grid>

        <Grid item>
          {/* Add User Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            style={{ marginBottom: "10px" }}
          >
            Add User
          </Button>
        </Grid>
      </Grid>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roles.join(", ")}</td>
              <td>
                <Tooltip title="Edit User">
                  <IconButton onClick={() => handleEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete User">
                  <IconButton
                    onClick={() => handleDeleteUser(user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            label="Username"
            value={currentUser?.username || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, username: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            value={currentUser?.email || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <div>
            <label>Roles:</label>
            {allRoles.map((role) => (
              <div key={role}>
                <label>
                  <input
                    type="checkbox"
                    checked={currentUser?.roles.includes(role) || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const updatedRoles = checked
                        ? [...(currentUser?.roles || []), role]
                        : currentUser.roles.filter((r) => r !== role);
                      setCurrentUser({ ...currentUser, roles: updatedRoles });
                    }}
                  />
                  {role}
                </label>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
