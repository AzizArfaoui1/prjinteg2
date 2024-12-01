package com.example.Avis_service.repository;

import com.example.Avis_service.entity.Avis;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvisRepository extends MongoRepository<Avis, String> {
    List<Avis> findByTargetId(String targetId);
}