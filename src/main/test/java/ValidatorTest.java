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
        user.setName("Pavel");
        user.setLogin("Pashkafdghfggggggggggggggggggggggggg");
        user.setPassword("fg");
        user.setEmail("rydakpavelfs@gmail.com");
        user.test=67;
        Validator validator = Validator.getValidator();
        Validator.BindingResult check = validator.check(user);
        System.out.println(check);
    }
}
