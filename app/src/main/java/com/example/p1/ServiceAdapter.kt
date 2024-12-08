package com.example.p1

import Service
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide // Import explicite pour Glide

class ServicesAdapter(
    private val services: MutableList<Service>,
    private val onDeleteClick: (Service) -> Unit,
    private val onEditClick: (Service) -> Unit // Ajout du paramètre pour gérer l'édition
) : RecyclerView.Adapter<ServicesAdapter.ServiceViewHolder>() {

    class ServiceViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val nameTextView: TextView = itemView.findViewById(R.id.serviceName)
        val descriptionTextView: TextView = itemView.findViewById(R.id.serviceDescription)
        val priceTextView: TextView = itemView.findViewById(R.id.servicePrice)
        val deleteIcon: ImageButton = itemView.findViewById(R.id.deleteIcon)
        val editIcon: ImageButton = itemView.findViewById(R.id.editIcon) // Ajout de l'icône de modification
        val imageView: ImageView = itemView.findViewById(R.id.serviceImage)

        fun bind(service: Service, onDeleteClick: (Service) -> Unit, onEditClick: (Service) -> Unit) {
            nameTextView.text = service.serviceName
            descriptionTextView.text = service.description
            priceTextView.text = "Prix : ${service.price} TND"

            Glide.with(itemView.context)
                .load(service.imageUrl)
                .placeholder(R.drawable.logo_neto)
                .error(R.drawable.logo_neto)
                .into(imageView)

            deleteIcon.setOnClickListener { onDeleteClick(service) }
            editIcon.setOnClickListener { onEditClick(service) } // Gestion du clic pour l'édition
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ServiceViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_service, parent, false)
        return ServiceViewHolder(view)
    }

    override fun onBindViewHolder(holder: ServiceViewHolder, position: Int) {
        val service = services[position]
        holder.bind(service, onDeleteClick, onEditClick) // Passez le callback pour l'édition

        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, ServiceDetailActivity::class.java)
            intent.putExtra("SERVICE_ID", service.id)
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = services.size

    fun removeService(service: Service) {
        val position = services.indexOf(service)
        if (position != -1) {
            services.removeAt(position)
            notifyItemRemoved(position)
        }
    }
}
