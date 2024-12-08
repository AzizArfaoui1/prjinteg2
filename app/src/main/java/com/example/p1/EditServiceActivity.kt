package com.example.p1

import Service
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class EditServiceActivity : AppCompatActivity() {

    private lateinit var serviceNameEditText: EditText
    private lateinit var serviceDescriptionEditText: EditText
    private lateinit var servicePriceEditText: EditText
    private lateinit var serviceDateEditText: EditText
    private lateinit var serviceDureeEditText: EditText
    private lateinit var serviceImageUrlEditText: EditText
    private lateinit var doneButton: Button
    private var service: Service? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_service)

        // Initialisation des vues
        serviceNameEditText = findViewById(R.id.serviceNameEditText)
        serviceDescriptionEditText = findViewById(R.id.serviceDescriptionEditText)
        servicePriceEditText = findViewById(R.id.servicePriceEditText)
        serviceDateEditText = findViewById(R.id.serviceDateEditText)
        serviceDureeEditText = findViewById(R.id.serviceDureeEditText)
        serviceImageUrlEditText = findViewById(R.id.serviceImageUrlEditText)
        doneButton = findViewById(R.id.doneButton)

        // Récupérer l'objet Service passé par Intent
        service = intent.getParcelableExtra("service")

        service?.let {
            // Remplir les champs du formulaire avec les données actuelles
            serviceNameEditText.setText(it.serviceName)
            serviceDescriptionEditText.setText(it.description)
            servicePriceEditText.setText(it.price.toString())
            serviceDateEditText.setText(it.date)
            serviceDureeEditText.setText(it.duree)
            serviceImageUrlEditText.setText(it.imageUrl)
        }

        // Bouton pour valider la modification
        doneButton.setOnClickListener {
            val updatedService = service?.copy(
                serviceName = serviceNameEditText.text.toString(),
                description = serviceDescriptionEditText.text.toString(),
                price = servicePriceEditText.text.toString().toDoubleOrNull() ?: 0.0,
                date = serviceDateEditText.text.toString(),
                duree = serviceDureeEditText.text.toString(),
                imageUrl = serviceImageUrlEditText.text.toString()
            )

            if (updatedService != null) {
                updateService(updatedService)
            }
        }
    }

    private fun updateService(service: Service) {
        val apiService = ApiClient.retrofit.create(ApiService::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                // Vérifier si l'objet service a bien un ID valide
                val serviceId = service.id ?: return@launch // Vérifier si l'ID est null, sinon interrompre

                // Envoi de la requête PUT avec l'ID dans l'URL et l'objet 'service' dans le corps
                val response = apiService.updateService(serviceId, service)

                if (response.isSuccessful) {
                    withContext(Dispatchers.Main) {
                        setResult(RESULT_OK)
                        finish()  // Retour à l'activité précédente
                        Toast.makeText(
                            this@EditServiceActivity,
                            "Service modifié avec succès",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                } else {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(
                            this@EditServiceActivity,
                            "Erreur lors de la modification",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(
                        this@EditServiceActivity,
                        "Erreur : ${e.message}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }
}