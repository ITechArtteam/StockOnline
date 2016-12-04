import com.itechart.stockOnline.dao.RoleRepository;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.service.RoleService;
import com.itechart.stockOnline.service.RoleServiceImpl;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class RoleServiceImplTest {
    @Autowired
    private RoleService roleService;
    @Test
    public void testGetAll() throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Date date = dateFormat.parse("08/12/2016");
        System.out.println(dateFormat.format(date));

    }
}
