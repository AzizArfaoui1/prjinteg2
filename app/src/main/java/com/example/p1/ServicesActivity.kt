package com.example.p1

import Service
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ServicesActivity : AppCompatActivity() {

    private lateinit var serviceAdapter: ServicesAdapter
    private val serviceList = mutableListOf<Service>()

    companion object {
        const val REQUEST_CODE_CREATE_SERVICE = 1001
        const val REQUEST_CODE_EDIT_SERVICE = 1002  // Nouveau code pour l'édition
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_services)

        val recyclerView: RecyclerView = findViewById(R.id.servicesRecyclerView)
        val errorTextView: TextView = findViewById(R.id.errorTextView)
        val createServiceButton: Button = findViewById(R.id.createServiceButton)

        // Adapter avec callback pour la suppression et la modification
        serviceAdapter = ServicesAdapter(serviceList, { service ->
            deleteService(service)
        }, { service ->
            editService(service)
        })

        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = serviceAdapter

        loadServices(recyclerView, errorTextView)

        // Gérer le clic sur "Créer un service"
        createServiceButton.setOnClickListener {
            val intent = Intent(this, CreateServiceActivity::class.java)
            startActivityForResult(intent, REQUEST_CODE_CREATE_SERVICE)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_CODE_CREATE_SERVICE && resultCode == RESULT_OK) {
            // Recharger la liste des services après la création
            val recyclerView: RecyclerView = findViewById(R.id.servicesRecyclerView)
            val errorTextView: TextView = findViewById(R.id.errorTextView)
            loadServices(recyclerView, errorTextView)
        } else if (requestCode == REQUEST_CODE_EDIT_SERVICE && resultCode == RESULT_OK) {
            // Recharger les services après modification
            val recyclerView: RecyclerView = findViewById(R.id.servicesRecyclerView)
            val errorTextView: TextView = findViewById(R.id.errorTextView)
            loadServices(recyclerView, errorTextView)
        }
    }

    private fun loadServices(recyclerView: RecyclerView, errorTextView: TextView) {
        val apiService = ApiClient.retrofit.create(ApiService::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val services = apiService.getAllServices()
                withContext(Dispatchers.Main) {
                    serviceList.clear()
                    serviceList.addAll(services)
                    serviceAdapter.notifyDataSetChanged()
                    recyclerView.visibility = View.VISIBLE
                    errorTextView.visibility = View.GONE
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    errorTextView.text = "Erreur : ${e.message}"
                    errorTextView.visibility = View.VISIBLE
                    recyclerView.visibility = View.GONE
                }
            }
        }
    }

    private fun deleteService(service: Service) {
        val apiService = ApiClient.retrofit.create(ApiService::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = apiService.deleteService(service.id ?: "")
                if (response.isSuccessful) {
                    withContext(Dispatchers.Main) {
                        serviceAdapter.removeService(service)
                        Toast.makeText(this@ServicesActivity, "Service supprimé avec succès", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@ServicesActivity, "Erreur lors de la suppression", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ServicesActivity, "Erreur : ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun editService(service: Service) {
        // Ouvrir l'activité de modification du service avec l'objet service
        val intent = Intent(this, EditServiceActivity::class.java)
        intent.putExtra("service", service)  // Passer l'objet service complet
        startActivityForResult(intent, REQUEST_CODE_EDIT_SERVICE)
    }
}
