import com.itechart.stockOnline.dao.RoleRepository;
import com.itechart.stockOnline.model.Role;
import com.itechart.stockOnline.service.RoleService;
import com.itechart.stockOnline.service.RoleServiceImpl;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class RoleServiceImplTest {
    @Autowired
    private RoleService roleService;
    @Test
    public void testGetAll(){
        List<Role> roles = roleService.getAll();
        System.out.println(roles);
    }
}
