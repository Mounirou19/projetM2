import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Admin.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [medias, setMedias] = useState([]);
  const [profils, setProfils] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  
  // États pour les fonctionnalités de pliage/dépliage
  const [expandedSections, setExpandedSections] = useState({
    users: false,
    medias: false,
    profils: false,
    contacts: false
  });
  
  // États pour la recherche et les filtres
  const [userSearch, setUserSearch] = useState("");
  const [mediaSearch, setMediaSearch] = useState("");
  const [profilFilter, setProfilFilter] = useState("all");
  const [contactFilter, setContactFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

    const infos = [process.env.REACT_APP_ROLE_ADMIN ,process.env.REACT_APP_TOKEN];

    const fetchData = async () => {
      const Response = await fetch(`${process.env.REACT_APP_API_URL}/admin/board?infos=${infos}`, {
        headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
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
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
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
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
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
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
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
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
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
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
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
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
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
            headers: { "Content-Type": "application/json", 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
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

    // Fonction pour basculer l'état d'expansion d'une section
    const toggleSection = (section) => {
      setExpandedSections({
        ...expandedSections,
        [section]: !expandedSections[section]
      });
    };
  
    // Filtrer les utilisateurs selon la recherche
    const filteredUsers = users.filter(user => 
      user.firstname.toLowerCase().includes(userSearch.toLowerCase()) || 
      user.lastname.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase())
    );
  
    // Filtrer les médias selon la recherche
    const filteredMedias = medias.filter(media => 
      media.title.toLowerCase().includes(mediaSearch.toLowerCase()) ||
      media.status.toLowerCase().includes(mediaSearch.toLowerCase()) ||
      media.type.toLowerCase().includes(mediaSearch.toLowerCase())
    );
  
    // Filtrer les contacts selon le statut
    const filteredContacts = contacts.filter(contact => {
      if (contactFilter === "all") return contact.status === false || contact.status === true;
      if (contactFilter === "read") return contact.status === false;
      if (contactFilter === "unread") return contact.status === true;
      return true;
    });

    // Filtrer les profils selon le filtre
    const filteredProfils = profils.filter(profil => {
        if (profilFilter === "all") return true;
        return profil.id_user === parseInt(profilFilter);
    });


  return (
    <div className="baissetoi">
      <div className="but" >
        <button onClick={() => navigate("/admin/create/user")}>Ajouter un utilisateur</button>
        <button onClick={() => navigate("/admin/create/media")}>Ajouter un media</button>
        <button onClick={() => navigate("/admin/stats")}>Afficher les statistiques</button> 
      </div>
      <h1>Admin Page</h1>

      {/* Section Utilisateurs */}
      <div className="admin-section">
        <div className="section-header" onClick={() => toggleSection("users")}>
          <h2>Utilisateurs</h2>
          <span>{expandedSections.users ? "▲" : "▼"}</span>
        </div>
        {expandedSections.users && (
          <div className="section-content">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Rechercher un utilisateur..." 
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>
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
                {filteredUsers.map((user) => (
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
          </div>
        )}
      </div>

      {/* Section Médias */}
      <div className="admin-section">
        <div className="section-header" onClick={() => toggleSection("medias")}>
          <h2>Médias</h2>
          <span>{expandedSections.medias ? "▲" : "▼"}</span>
        </div>
        {expandedSections.medias && (
          <div className="section-content">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Rechercher un média..." 
                value={mediaSearch}
                onChange={(e) => setMediaSearch(e.target.value)}
              />
            </div>
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
                {filteredMedias.map((media) => (
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
          </div>
        )}
      </div>

        {/* Section Profils */}
        <div className="admin-section">
        <div className="section-header" onClick={() => toggleSection("profils")}>
            <h2>Profils</h2>
            <span>{expandedSections.profils ? "▲" : "▼"}</span>
        </div>
        {expandedSections.profils && (
            <div className="section-content">
            <div className="filter-input">
                <input 
                type="text" 
                placeholder="Filtrer par ID utilisateur ou média..." 
                value={profilFilter === "all" ? "" : profilFilter}
                onChange={(e) => {
                    if (e.target.value === "") {
                    setProfilFilter("all");
                    } else {
                    setProfilFilter(e.target.value);
                    }
                }}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>ID_User</th>
                    <th>ID_Media</th>
                </tr>
                </thead>
                <tbody>
                {filteredProfils.map((profil) => (
                    <tr key={profil.id}>
                    <td>{profil.id}</td>
                    <td>{profil.id_user}</td>
                    <td>{profil.id_media}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>

      {/* Section Contacts */}
      <div className="admin-section">
        <div className="section-header" onClick={() => toggleSection("contacts")}>
          <h2>Contacts</h2>
          <span>{expandedSections.contacts ? "▲" : "▼"}</span>
        </div>
        {expandedSections.contacts && (
          <div className="section-content">
            <div className="filter-dropdown">
              <select value={contactFilter} onChange={(e) => setContactFilter(e.target.value)}>
                <option value="all">Tous les messages</option>
                <option value="read">Messages lus</option>
                <option value="unread">Messages non lus</option>
              </select>
            </div>
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
                {filteredContacts.map((contact) => (
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
        )}
      </div>
    </div>
  );
}

export default AdminPage;