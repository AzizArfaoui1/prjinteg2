package com.example.Prestataire_service.repository;

import com.example.Prestataire_service.entity.Provider;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProviderRepository extends MongoRepository<Provider, String> {
    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire.
}