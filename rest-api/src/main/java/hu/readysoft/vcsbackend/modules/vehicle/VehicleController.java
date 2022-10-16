package hu.readysoft.vcsbackend.modules.vehicle;

import hu.readysoft.vcsbackend.common.BaseModel;
import hu.readysoft.vcsbackend.common.RestUIBuilder;
import hu.readysoft.vcsbackend.common.table.TableBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/vehicles")
@CrossOrigin(origins = "*", maxAge = 3600)
public class VehicleController extends RestUIBuilder<Vehicle, VehicleRepository> {

    @Override
    public Class<Vehicle> getModelClass() {
        return Vehicle.class;
    }

    @Override
    public TableBuilder dataTableUI() {
        return new TableBuilder()
                .column(BaseModel.Fields.id)
                .column(Vehicle.Fields.licensePlateNumber)
                .column(Vehicle.Fields.manufacturer)
                .column(Vehicle.Fields.type)
                .column(Vehicle.Fields.chassisNumber)
                .column(Vehicle.Fields.responsibleUser);
    }
}
