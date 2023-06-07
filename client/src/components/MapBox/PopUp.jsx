const PopUp = ({ record }) => (
  <div className="map-popup">
    <img src="https://picsum.photos/300/200"></img>
    <div class="popup-description">
      <h3>
        {record.fields.nomoff.charAt(0).toUpperCase() +
          record.fields.nomoff.slice(1)}
      </h3>
      <p>{record.fields.lieu_m ?? ""}</p>
      <p>{record.fields.adrl1_m ?? ""}</p>
      <p>
        {record.fields.cp_m ?? ""} {record.fields.ville_m ?? ""}
      </p>
    </div>
  </div>
);
export default PopUp;
