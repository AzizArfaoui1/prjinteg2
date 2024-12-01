package com.example.Localisation_service.controller;


import com.example.Localisation_service.entity.Localisation;
import com.example.Localisation_service.service.LocalisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/localisations")
public class LocalisationController {

    @Autowired
    private LocalisationService localisationService;

    @GetMapping
    public ResponseEntity<List<Localisation>> getAllLocalisations() {
        return new ResponseEntity<>(localisationService.getAllLocalisations(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Localisation> getLocalisationById(@PathVariable String id) {
        return new ResponseEntity<>(localisationService.getLocalisationById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Localisation> createLocalisation(@RequestBody Localisation localisation) {
        return new ResponseEntity<>(localisationService.createLocalisation(localisation), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Localisation> updateLocalisation(@PathVariable String id, @RequestBody Localisation localisationDetails) {
        return new ResponseEntity<>(localisationService.updateLocalisation(id, localisationDetails), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocalisation(@PathVariable String id) {
        localisationService.deleteLocalisation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}