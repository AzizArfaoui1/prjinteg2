package com.example.p1

import Service
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {
    @GET("/services")
    suspend fun getAllServices(): List<Service>

    @POST("/services")
    suspend fun createService(@Body service: Service): Response<Service>
// La méthode doit être suspendue pour être utilisée avec des coroutines
@DELETE("/services/{id}")
suspend fun deleteService(@Path("id") id: String): Response<Void>
    @GET("services/{id}")
    suspend fun getServiceById(@Path("id") id: String): Response<Service>

    @PUT("services/{id}")
    suspend fun updateService(
        @Path("id") id: String, // ID du service (correspond à l'ID dans l'URL)
        @Body service: Service // L'objet Service à mettre à jour
    ): Response<Service>

}
