package com.example.Prestataire_service.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "prestataires")
public class Provider {

    @Id
    private String id;
    private String username;
    private String password;  // Utiliser un mot de passe crypté
    private String job;
    private String firstname;
    private String lastname;
    private String phone;  // Modifier le type en String pour gérer les numéros avec des préfixes
    private String email;
    private String location;
    private Boolean comments;  // Peut être utilisé pour savoir si le prestataire accepte les avis

    // Constructeurs
    public Provider() {
    }

    public Provider(String username, String password, String job, String firstname, String lastname, String email, String location, Boolean comments) {
        this.username = username;
        this.password = password;
        this.job = job;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.location = location;
        this.comments = comments;
    }

    // Getters et Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean getComments() {
        return comments;
    }

    public void setComments(Boolean comments) {
        this.comments = comments;
    }
}
