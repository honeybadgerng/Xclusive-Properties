"use client";

import { useState, useEffect } from "react";
import styles from "@/app/agentdashboard/add-property/AddPropertyPage.module.css"; // reuse same CSS

interface PropertyFormProps {
  mode: "add" | "edit";
  initialData?: any;
  onSubmit: (
    data: any,
    images: File[],
    existingImages: string[]
  ) => Promise<void>;
}

export default function PropertyForm({
  mode,
  initialData,
  onSubmit,
}: PropertyFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [marketStatus, setMarketStatus] = useState(
    initialData?.marketStatus || ""
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [type, setType] = useState(initialData?.type || "");
  const [subtype, setSubtype] = useState(initialData?.subtype || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [usdtPrice, setUsdtPrice] = useState(initialData?.usdtPrice || "");
  const [state, setState] = useState(initialData?.state || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [street, setStreet] = useState(initialData?.street || "");
  const [paymentFrequency, setPaymentFrequency] = useState(
    initialData?.paymentFrequency || ""
  );
  const [bedrooms, setBedrooms] = useState(initialData?.bedrooms || "");
  const [toilets, setToilets] = useState(initialData?.toilets || "");
  const [bathrooms, setBathrooms] = useState(initialData?.bathrooms || "");
  const [parkingSpaces, setParkingSpaces] = useState(
    initialData?.parkingSpaces || ""
  );
  const [totalArea, setTotalArea] = useState(initialData?.totalArea || "");
  const [coveredArea, setCoveredArea] = useState(
    initialData?.coveredArea || ""
  );
  const [furnished, setFurnished] = useState(initialData?.furnished || false);
  const [serviced, setServiced] = useState(initialData?.serviced || false);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [premium, setPremium] = useState(initialData?.premium || false);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [images, setImages] = useState<File[]>([]);
  const [facilities, setFacilities] = useState<string[]>(
    initialData?.facilities || []
  );
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.images || []
  );

  const statesInNigeria = [
    "Abia",
    "Abuja",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  //facility options
  const facilityGroups = [
    {
      category: "Room & Interior",
      items: [
        "🛏️ Wardrobes / Closets",
        "🚿 Shower",
        "🛁 Bathtub",
        "🚽 Modern toilet (WC)",
        "🔌 Prepaid electricity meter",
        "🔥 Water heater",
        "❄️ Air conditioning (AC units)",
        "💡 Lighting fixtures",
        "🔌 Wall sockets / USB charging ports",
        "🧱 POP ceiling",
        "🪟 Sliding windows / Tinted windows",
        "🔑 Secure doors (steel or reinforced)",
        "🎛️ Kitchen cabinets & drawers",
        "🍽️ Fitted kitchen (with stove, oven, extractor)",
        "🚿 Visitors' toilet (guest convenience)",
      ],
    },
    {
      category: "Safety & Security",
      items: [
        "🚨 Security doors / burglary proof",
        "🎥 CCTV surveillance",
        "👮 Gated estate / Security personnel",
        "🔔 Intercom system",
        "🚒 Fire extinguisher",
        "🚧 Fence with razor wire / electric fence",
        "🕹️ Remote gate access / smart lock",
      ],
    },
    {
      category: "Utilities & Services",
      items: [
        "💧 Borehole / Clean water supply",
        "🚿 Water treatment plant",
        "⚡ Backup power (Inverter / Generator)",
        "🧹 Waste disposal system",
        "🧼 Cleaning services / Janitor",
        "🔌 PHCN/NEPA electricity connection",
        "📦 Package/parcel locker system",
      ],
    },
    {
      category: "Shared/Common Amenities",
      items: [
        "🛗 Elevator (for high-rise apartments)",
        "🏊 Swimming pool",
        "🏋️ Gym / Fitness center",
        "🧘 Yoga room / Studio",
        "🏞️ Playground / Children’s park",
        "🛝 Recreational area / Lounge",
        "🅿️ Parking lot / Garage",
        "🧺 Laundry room",
        "🚲 Bicycle rack",
        "🏠 Estate management office",
        "🚪 Concierge / Doorman service",
      ],
    },
    {
      category: "Technology / Smart Home",
      items: [
        "📶 Internet / Fiber optics ready",
        "📱 Smart home system (voice or app controlled)",
        "🛎️ Smart doorbell / Video intercom",
        "🔒 Biometric access",
      ],
    },
    {
      category: "Optional Premium Extras",
      items: [
        "🌳 Garden / Green area",
        "📺 Satellite TV / DSTV wiring",
        "🍖 Outdoor barbecue area",
        "🧊 Cold room / Pantry",
        "🧯 Smoke detectors / Gas leak detectors",
        "🚗 Carport / Private garage",
        "🏠 Serviced apartment option",
      ],
    },
  ];

  const subtypes: Record<string, string[]> = {
    "flat/apartment": [
      "Mini Flat (Room & Parlour)",
      "Self Contain (Studio Apartment)",
      "2 Bedroom and above",
    ],
    House: [
      "Detached Bungalow",
      "Detached Duplex",
      "Semi-Detached Bungalow",
      "Semi-Detached Duplex",
      "Terraced Bungalow",
      "Terraced Duplex",
    ],
    Land: [
      "Commercial Land",
      "Industrial Land",
      "Mixed-used Land",
      "Residential Land",
    ],
    "commercial property": [
      "Church",
      "Factory",
      "Filling Station",
      "Hotel/Guest House",
      "Office Space",
      "Plaza/Complex/Mall",
      "Restaurant/Bar",
      "School",
      "Shop",
      "Tank Farm",
      "Warehouse",
    ],
    "Event Center/ Venue": ["Conference/Meeting/Training Room", "Hall"],
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const toggleFacility = (facility: string) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const property = {
      title,
      slug,
      marketStatus,
      category,
      price: Number(price),
      usdtPrice: Number(usdtPrice),
      state,
      city,
      street,
      type,
      subtype,
      paymentFrequency,
      bedrooms: Number(bedrooms),
      toilets: Number(toilets),
      bathrooms: Number(bathrooms),
      parkingSpaces: Number(parkingSpaces),
      totalArea: Number(totalArea),
      coveredArea: Number(coveredArea),
      furnished,
      serviced,
      featured,
      premium,
      description,
      videoUrl,
      facilities,
    };

    await onSubmit(property, images, existingImages);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Title, Slug, Prices */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Property Title</label>
        <input
          className={styles.input}
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Slug</label>
        <input
          className={styles.input}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Market Status</label>
        <select
          className={styles.input}
          value={marketStatus}
          onChange={(e) => setMarketStatus(e.target.value)}
        >
          <option>Select Market Status</option>
          <option>available</option>
          <option>rented</option>
          <option>sold</option>
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Category</label>
        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          <option>for rent</option>
          <option>for sale</option>
          <option>joint venture</option>
          <option>short-let</option>
        </select>
      </div>
      {/* Type & Subtype */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Type</label>
        <select
          className={styles.input}
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          {Object.keys(subtypes).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {type && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>Subtype</label>
          <select
            className={styles.input}
            value={subtype}
            onChange={(e) => setSubtype(e.target.value)}
            required
          >
            <option value="">Select Subtype</option>
            {subtypes[type]?.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Location Fields */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>State</label>
        <select
          className={styles.input}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value="">Select State</option>
          {statesInNigeria.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>City/Locality</label>
        <input
          className={styles.input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Street/Estate</label>
        <input
          className={styles.input}
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Price (₦)</label>
        <input
          type="number"
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Price (USDT)</label>
        <input
          type="number"
          className={styles.input}
          value={usdtPrice}
          onChange={(e) => setUsdtPrice(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Payment Frequency</label>
        <select
          className={styles.input}
          value={paymentFrequency}
          onChange={(e) => setPaymentFrequency(e.target.value)}
        >
          <option value="">Select payment frequency</option>
          <option>per annum</option>
          <option>per month</option>
          <option>per week</option>
          <option>per day</option>
          <option>per hour</option>
          <option>one time payment</option>
        </select>
      </div>
      {/* Property Details */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Bedrooms</label>
        <input
          className={styles.input}
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Toilets</label>
        <input
          className={styles.input}
          type="number"
          value={toilets}
          onChange={(e) => setToilets(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Bathrooms</label>
        <input
          className={styles.input}
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Parking Spaces</label>
        <input
          className={styles.input}
          type="number"
          value={parkingSpaces}
          onChange={(e) => setParkingSpaces(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Total Area (sqm)</label>
        <input
          className={styles.input}
          type="number"
          value={totalArea}
          onChange={(e) => setTotalArea(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Covered Area (sqm)</label>
        <input
          className={styles.input}
          type="number"
          value={coveredArea}
          onChange={(e) => setCoveredArea(e.target.value)}
        />
      </div>
      {/* Booleans */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Furnished</label>
        <input
          type="checkbox"
          checked={furnished}
          onChange={(e) => setFurnished(e.target.checked)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Serviced</label>
        <input
          type="checkbox"
          checked={serviced}
          onChange={(e) => setServiced(e.target.checked)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Featured</label>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Premium</label>
        <input
          type="checkbox"
          checked={premium}
          onChange={(e) => setPremium(e.target.checked)}
        />
      </div>
      {/* Media */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Video URL</label>
        <input
          className={styles.input}
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Upload Images (max 20)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              const files = Array.from(e.target.files);
              if (files.length > 20) {
                alert("You can only upload up to 20 images.");
                return;
              }
              setImages(files);
            }
          }}
        />

        {/* Preview & reorder */}
        <div className={styles.previewContainer}>
          {images.map((file, index) => (
            <div key={index} className={styles.previewItem}>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className={styles.previewImage}
              />
              {/* Move up */}
              {index > 0 && (
                <button
                  type="button"
                  className={styles.moveButton}
                  onClick={() => {
                    const updated = [...images];
                    [updated[index - 1], updated[index]] = [
                      updated[index],
                      updated[index - 1],
                    ];
                    setImages(updated);
                  }}
                >
                  ↑
                </button>
              )}
              {/* Move down */}
              {index < images.length - 1 && (
                <button
                  type="button"
                  className={styles.moveButton}
                  onClick={() => {
                    const updated = [...images];
                    [updated[index], updated[index + 1]] = [
                      updated[index + 1],
                      updated[index],
                    ];
                    setImages(updated);
                  }}
                >
                  ↓
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Facilities */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Facilities</label>
        {facilityGroups.map((group) => (
          <div key={group.category} style={{ marginBottom: "1rem" }}>
            <strong>{group.category}</strong>
            <div style={{ marginTop: "0.5rem" }}>
              {group.items.map((f) => (
                <label
                  key={f}
                  style={{ display: "block", marginBottom: "4px" }}
                >
                  <input
                    type="checkbox"
                    checked={facilities.includes(f)}
                    onChange={() => toggleFacility(f)}
                  />
                  {" " + f}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {existingImages.map((url, idx) => (
          <div key={idx} className={styles.previewItem}>
            <img src={url} className={styles.previewImage} />
            <button
              type="button"
              onClick={() =>
                setExistingImages((prev) => prev.filter((_, i) => i !== idx))
              }
            >
              Remove
            </button>
          </div>
        ))}
        {images.map((file, index) => (
          <div key={index} className={styles.previewItem}>
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className={styles.previewImage}
            />
            <button
              type="button"
              onClick={() =>
                setImages((prev) => prev.filter((_, i) => i !== index))
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Other Fields */}
      {/* Add rest of fields here following same pattern */}

      <button type="submit" className={styles.submitButton}>
        {mode === "edit" ? "Update Property" : "Add Property"}
      </button>
    </form>
  );
}
