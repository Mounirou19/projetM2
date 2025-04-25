import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Admin.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [medias, setMedias] = useState([]);
  const [profils, setProfils] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

    const infos = [process.env.REACT_APP_ROLE_ADMIN ,process.env.REACT_APP_TOKEN];

    const fetchData = async () => {
      const Response = await fetch(`${process.env.REACT_APP_API_URL}/admin/board?infos=${infos}`, {
        headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
      });

      if (!Response.ok) {
        alert("Erreur lors de la récupération des données");
        return;
      }

      const datas = await Response.json();

      const usersData = datas.data.users;
      const mediasData = datas.data.medias;
      const profilsData = datas.data.profils;
      const contactsData = datas.data.contacts;

      setUsers(usersData);
      setMedias(mediasData);
      setProfils(profilsData);
      setContacts(contactsData);
    };

    const handleDeleteUser = async (id) => {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/delete/${id}?infos=${infos}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
        });
    
        if (!response.ok) {
            alert("Erreur lors de la désactivation de l'utilisateur");
        }else{
            alert("Utilisateur désactivé avec succès");
            fetchData();
        }
    };

    const handleDeleteverUser = async (id) => {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/deletever/${id}?infos=${infos}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
        });
    
        if (!response.ok) {
            alert("Erreur lors de la suppression de l'utilisateur");
        }else{
            alert("Utilisateur supprimer avec succès");
            fetchData();
        }
    };

    const handleReactiveUser = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/reactivate/${id}?infos=${infos}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
        });

        if (!response.ok) {
            alert("Erreur lors de la réactivation de l'utilisateur");
        }else{
            alert("Utilisateur réactivé avec succès");
            fetchData();
        }
    };

    const handleUpdateUser = async (id) => {
        navigate("/admin/edit/user/"+id);
    }

    const handleDeleteMedia = async (id) => {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/media/delete/${id}?infos=${infos}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
        });

        if (!response.ok) {
            alert("Erreur lors de la désactivation du media");
        }else{
            alert("Media désactivé avec succès");
            fetchData();
        }
    };

    const handleReactiveMedia = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/media/reactivate/${id}?infos=${infos}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
        });

        if (!response.ok) {
            alert("Erreur lors de la réactivation du media");
        }else{
            alert("Media réactivé avec succès");
            fetchData();
        }
    };

    const handleLuContact = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contact/lu/${id}?infos=${infos}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
        });

        if (!response.ok) {
            alert("Erreur lors de la mise à jour du contact");
        }else{
            alert("Contact mis à jour avec succès");
            fetchData();
        }
    };

    const handleDeleteContact = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contact/delete/${id}?infos=${infos}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}` },
        });

        if (!response.ok) {
            alert("Erreur lors de la suppression du contact");
        }else{
            alert("Contact supprimé avec succès");
            fetchData();
        }
    };

    const handleUpdateMedia = async (id) => {
        navigate("/admin/edit/media/"+id);
    }


  return (
    <div className="baissetoi">
        <div className="but" >
            <button onClick={() => navigate("/admin/create/user")}>Ajouter un utilisateur</button>
            <button onClick={() => navigate("/admin/create/media")}>Ajouter un media</button>
            <button onClick={() => navigate("/admin/stats")}>Afficher les statistiques</button> 
        </div>
        <h1>Admin Page</h1>

        <h2>Utilisateurs</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.lastname}</td>
                        <td>{user.firstname}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.status == true ? "Actif" : "Inactif"}</td>
                        <td>
                            <button onClick={() => handleUpdateUser(user.id)}>Editer</button>
                            {user.status === true && user.id != 1 && (
                                <button onClick={() => handleDeleteUser(user.id)}>Desactiver</button>
                            )}
                            {user.status === false && user.id != 1 && (
                                <button onClick={() => handleReactiveUser(user.id)}>Activer</button>
                            )}
                            {user.id != 1 && (
                                <button onClick={() => handleDeleteverUser(user.id)}>Supprimer</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <h2>Medias</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Url de l'image</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {medias.map((media) => (
                    <tr key={media.id}>
                        <td>{media.id}</td>
                        <td>{media.title}</td>
                        <td>{media.description.substring(0, 75)+" ..."}</td>
                        <td>{media.type}</td>
                        <td>{media.imageUrl}</td>
                        <td>{media.score}</td>
                        <td>{media.status == true ? "Actif" : "Inactif"}</td>
                        <td>
                            <button onClick={() => handleUpdateMedia(media.id)}>Editer</button>
                            {media.status === true && (
                                <button onClick={() => handleDeleteMedia(media.id)}>Desactiver</button>
                            )}
                            {media.status === false && (
                                <button onClick={() => handleReactiveMedia(media.id)}>Activer</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <h2>Profils</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ID_User</th>
                    <th>ID_Media</th>
                </tr>
            </thead>
            <tbody>
                {profils.map((profil) => (
                    <tr key={profil.id}>
                        <td>{profil.id}</td>
                        <td>{profil.id_user}</td>
                        <td>{profil.id_media}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.message}</td>
                        <td>{contact.createdAt}</td>
                        <td>{contact.status == false ? "Lu" : "Non lu"}</td>
                        <td>
                            <button onClick={() => navigate("/admin/contact/"+contact.id)}>Voir</button>
                            {contact.status === true && (
                                <button onClick={() => handleLuContact(contact.id)}>Marquer comme lu</button>
                            )}
                            <button onClick={() => handleDeleteContact(contact.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default AdminPage;