import android.os.Parcel
import android.os.Parcelable

data class Service(
    val id: String? = null,
    val serviceName: String,
    val description: String,
    val price: Double,
    val date: String,
    val duree: String,
    val imageUrl: String? = null // URL de l'image (optionnel)
) : Parcelable {

    constructor(parcel: Parcel) : this(
        parcel.readString(),
        parcel.readString() ?: "",
        parcel.readString() ?: "",
        parcel.readDouble(),
        parcel.readString() ?: "",
        parcel.readString() ?: "",
        parcel.readString()
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(id)
        parcel.writeString(serviceName)
        parcel.writeString(description)
        parcel.writeDouble(price)
        parcel.writeString(date)
        parcel.writeString(duree)
        parcel.writeString(imageUrl)
    }

    override fun describeContents(): Int = 0

    companion object CREATOR : Parcelable.Creator<Service> {
        override fun createFromParcel(parcel: Parcel): Service {
            return Service(parcel)
        }

        override fun newArray(size: Int): Array<Service?> {
            return arrayOfNulls(size)
        }
    }
}
