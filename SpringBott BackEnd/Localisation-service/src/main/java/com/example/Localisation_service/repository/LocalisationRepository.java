package com.example.Localisation_service.repository;

import com.example.Localisation_service.entity.Localisation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalisationRepository extends MongoRepository<Localisation, String> {
}