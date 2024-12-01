package com.example.Avis_service.controller;


import com.example.Avis_service.entity.Avis;
import com.example.Avis_service.service.AvisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avis")
public class AvisController {

    @Autowired
    private AvisService avisService;

    @GetMapping
    public ResponseEntity<List<Avis>> getAllAvis() {
        return new ResponseEntity<>(avisService.getAllAvis(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Avis> getAvisById(@PathVariable String id) {
        return new ResponseEntity<>(avisService.getAvisById(id), HttpStatus.OK);
    }

    @GetMapping("/target/{targetId}")
    public ResponseEntity<List<Avis>> getAvisByTargetId(@PathVariable String targetId) {
        return new ResponseEntity<>(avisService.getAvisByTargetId(targetId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Avis> createAvis(@RequestBody Avis avis) {
        return new ResponseEntity<>(avisService.createAvis(avis), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Avis> updateAvis(@PathVariable String id, @RequestBody Avis avisDetails) {
        return new ResponseEntity<>(avisService.updateAvis(id, avisDetails), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvis(@PathVariable String id) {
        avisService.deleteAvis(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}