package com.example.Reservation_service.entity;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "reservations")
public class ReservationEntity {
    @Id
    private String id;              // ID unique de la réservation
    private String userId;          // ID de l'utilisateur qui a fait la réservation
    private String providerId;      // ID du prestataire
    private String serviceId;       // ID du service réservé
    private Date date; // Date et heure de la réservation
    private String status;          // Statut de la réservation (ex : "PENDING", "CONFIRMED", "CANCELLED")

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}

