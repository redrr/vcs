package hu.readysoft.vcsbackend.modules.reservation;

import hu.readysoft.vcsbackend.common.BaseModel;
import hu.readysoft.vcsbackend.common.RestUIBuilder;
import hu.readysoft.vcsbackend.common.table.TableBuilder;
import hu.readysoft.vcsbackend.modules.users.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;



@RestController
@RequestMapping(value = "api/myreservations")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MyReservationsController extends RestUIBuilder<Reservation, ReservationRepository> {

    @Override
    public Class<Reservation> getModelClass() {
        return Reservation.class;
    }

    @Override
    public Predicate staticFilter(CriteriaBuilder cb, Root<Reservation> root, User username) {
        return cb.equal(root.get("user"), username);
    }

    @Override
    public TableBuilder dataTableUI() {
        return new TableBuilder()
                .column(BaseModel.Fields.id)
                .column(Reservation.Fields.vehicle)
                .column(Reservation.Fields.placeOfDelegation)
                .column(Reservation.Fields.startOfDelegation)
                .column(Reservation.Fields.endOfDelegation)
                .column(Reservation.Fields.status);
    }
}
