import com.itechart.stockOnline.model.Act;
import com.itechart.stockOnline.model.Transport;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.validation.Validator;
import com.itechart.stockOnline.validator.Worker;
import org.junit.Test;

public class ValidatorTest {
    @Test
    public void test() {
        User user = new User();
        user.setName("Pavelyi887y8y87y78y7t67t65t6r56r5e4e4ehhhhhhhhhhhhhhhh");
        user.setLogin("Pashkafdghfggggggggggggggggggggggggg");
        user.setPassword("fg");
        user.setEmail("rydakpavelfsgmail.com");
        Validator validator = Validator.getValidator();
        Validator.BindingResult check = validator.check(user, Worker.class);
        if (check.hasErroe()){
            System.out.println(check.get());
        }
        System.out.println(check);
    }
}
