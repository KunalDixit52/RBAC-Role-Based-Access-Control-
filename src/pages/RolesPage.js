import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../index.css"; // Import global styles

const RolesPage = () => {
  const [roles, setRoles] = useState([
    { id: 1, roleName: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, roleName: "Editor", permissions: ["Read", "Write"] },
  ]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const allPermissions = ["Read", "Write", "Delete"];

  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setIsEditing(true);
    setOpen(true);
  };

  const handleAddRole = () => {
    setCurrentRole({ id: Date.now(), roleName: "", permissions: [] });
    setIsEditing(false);
    setOpen(true);
  };

  const handleDeleteRole = (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const handleSave = () => {
    if (isEditing) {
      setRoles((prev) =>
        prev.map((role) => (role.id === currentRole.id ? currentRole : role))
      );
    } else {
      setRoles((prev) => [...prev, currentRole]);
    }
    setOpen(false);
  };

  return (
    <div>
      <h1>Roles</h1>

      {/* Flexbox container for centering */}
<Grid container justifyContent="center" spacing={2}>
  <Grid item>
    {/* Search Bar */}
    <TextField
      placeholder="Search roles..."
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
    {/* Add Role Button */}
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddRole}
      style={{ marginBottom: "10px" }}
    >
      Add Role
    </Button>
  </Grid>
</Grid>

      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id}>
              <td>{role.roleName}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <Tooltip title="Edit Role">
                  <IconButton onClick={() => handleEditRole(role)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Role">
                  <IconButton
                    onClick={() => handleDeleteRole(role.id)}
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
        <DialogTitle>{isEditing ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            label="Role Name"
            value={currentRole?.roleName || ""}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, roleName: e.target.value })
            }
            fullWidth
          />
          <FormGroup>
            {allPermissions.map((perm) => (
              <FormControlLabel
                key={perm}
                control={
                  <Checkbox
                    checked={currentRole?.permissions.includes(perm) || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setCurrentRole((prev) => ({
                        ...prev,
                        permissions: checked
                          ? [...prev.permissions, perm]
                          : prev.permissions.filter((p) => p !== perm),
                      }));
                    }}
                  />
                }
                label={perm}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RolesPage;
