package hu.readysoft.vcsbackend.modules.reservation;

import hu.readysoft.vcsbackend.common.BaseModel;
import hu.readysoft.vcsbackend.modules.users.User;
import hu.readysoft.vcsbackend.modules.vehicle.Vehicle;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Entity
@Table(name = "reservation")
@Getter
@Setter
@NoArgsConstructor
@FieldNameConstants
public class Reservation extends BaseModel<Reservation> {

    @ManyToOne
    @JoinColumn(name = "user", nullable=false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "vehicle", nullable=false)
    private Vehicle vehicle;

    @Column(name = "place_of_delegation", nullable=false)
    private String placeOfDelegation;

    @Temporal(TemporalType.DATE)
    @Column(name="start_of_delegation", nullable=false)
    private Date startOfDelegation;

    @Temporal(TemporalType.DATE)
    @Column(name="end_of_delegation", nullable=false)
    private Date endOfDelegation;

    @Column(name = "status", nullable=false)
    @Enumerated(EnumType.STRING)
    private ReservationStatus status = ReservationStatus.REQUESTED;

    @Override
    public void merge(Reservation orig) {
        setUser(Objects.isNull(getUser()) ? orig.getUser() : getUser());
        setVehicle(Objects.isNull(getVehicle()) ? orig.getVehicle() : getVehicle());
        setPlaceOfDelegation(Objects.isNull(getPlaceOfDelegation()) ? orig.getPlaceOfDelegation() : getPlaceOfDelegation());
        setStartOfDelegation(Objects.isNull(getStartOfDelegation()) ? orig.getStartOfDelegation() : getStartOfDelegation());
        setEndOfDelegation(Objects.isNull(getEndOfDelegation()) ? orig.getEndOfDelegation() : getEndOfDelegation());
        setStatus(Objects.isNull(getStatus()) ? orig.getStatus() : getStatus());
    }
}
