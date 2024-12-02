package com.example.Reservation_service.controller;

import com.example.Reservation_service.entity.ReservationEntity;
import com.example.Reservation_service.exception.ReservationNotFoundException;
import com.example.Reservation_service.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // Créer une nouvelle réservation
    @PostMapping
    public ResponseEntity<ReservationEntity> createReservation(@RequestBody ReservationEntity reservation) {
        ReservationEntity createdReservation = reservationService.createReservation(reservation);
        return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
    }

    // Récupérer toutes les réservations
    @GetMapping
    public ResponseEntity<List<ReservationEntity>> getAllReservations() {
        List<ReservationEntity> reservations = reservationService.getAllReservations();
        if (reservations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    // Récupérer une réservation par son ID
    @GetMapping("/{id}")
    public ResponseEntity<ReservationEntity> getReservationById(@PathVariable String id) {
        Optional<ReservationEntity> reservation = reservationService.getReservationById(id);
        return reservation.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Mettre à jour une réservation
    @PutMapping("/{id}")
    public ResponseEntity<ReservationEntity> updateReservation(@PathVariable String id, @RequestBody ReservationEntity updatedReservation) {
        Optional<ReservationEntity> reservation = reservationService.updateReservation(id, updatedReservation);
        return reservation.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Supprimer une réservation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        boolean isDeleted = reservationService.deleteReservation(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Récupérer les réservations par utilisateur
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationEntity>> getReservationsByUser(@PathVariable String userId) {
        List<ReservationEntity> reservations = reservationService.getReservationsByUser(userId);
        if (reservations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    // Récupérer les réservations par prestataire
    @GetMapping("/providers/{providerId}")
    public ResponseEntity<List<ReservationEntity>> getReservationsByProvider(@PathVariable String providerId) {
        List<ReservationEntity> reservations = reservationService.getReservationsByProvider(providerId);
        if (reservations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    // Récupérer les réservations par service
    @GetMapping("/services/{serviceId}")
    public ResponseEntity<List<ReservationEntity>> getReservationsByService(@PathVariable String serviceId) {
        List<ReservationEntity> reservations = reservationService.getReservationsByService(serviceId);
        if (reservations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    // Récupérer les réservations par statut
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ReservationEntity>> getReservationsByStatus(@PathVariable String status) {
        List<ReservationEntity> reservations = reservationService.getReservationsByStatus(status);
        if (reservations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
}
