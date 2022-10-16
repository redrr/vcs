package hu.readysoft.vcsbackend.modules.vehicle;

import hu.readysoft.vcsbackend.common.BaseModel;
import hu.readysoft.vcsbackend.modules.users.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;

import javax.persistence.*;
import java.util.Objects;
import java.util.Optional;

@Entity
@Table(name = "vehicle")
@Getter
@Setter
@NoArgsConstructor
@FieldNameConstants
public class Vehicle extends BaseModel<Vehicle> {

    @Column(name = "license_plate_number", nullable=false)
    private String licensePlateNumber;

    @Column(name = "manufacturer", nullable=false)
    private String manufacturer;

    @Column(name = "type", nullable=false)
    private String type;

    @Column(name = "chassis_number", nullable=false)
    private String chassisNumber;

    @Column(name = "color", nullable=false)
    private String color;

    @ManyToOne
    @JoinColumn(name = "responsible_user", nullable = false)
    private User responsibleUser;

    @Override
    public String toString() {
        return Objects.toString(licensePlateNumber, "").concat(" - ")
                .concat(Objects.toString(manufacturer, "")).concat(" ")
                .concat(Objects.toString(type, ""));
    }

    @Override
    public void merge(Vehicle orig) {
        setLicensePlateNumber(Objects.isNull(getLicensePlateNumber()) ? orig.getLicensePlateNumber() : getLicensePlateNumber());
        setManufacturer(Objects.isNull(getManufacturer()) ? orig.getManufacturer() : getManufacturer());
        setType(Objects.isNull(getType()) ? orig.getType() : getType());
        setChassisNumber(Objects.isNull(getChassisNumber()) ? orig.getChassisNumber() : getChassisNumber());
        setColor(Objects.isNull(getColor()) ? orig.getColor() : getColor());
        setResponsibleUser(Objects.isNull(getResponsibleUser()) ? orig.getResponsibleUser() : getResponsibleUser());
    }
}
