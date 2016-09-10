/**
 * 
 */
package test;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * @author 689626
 */
public class PrintDateTest {

    PrintDate printDate;

    /**
     * @throws java.lang.Exception
     */
    @Before
    public void setUp() throws Exception {
        printDate = new PrintDate();
    }

    /**
     * @throws java.lang.Exception
     */
    @After
    public void tearDown() throws Exception {
        printDate = null;
    }

    /**
     * Test method for {@link test.PrintDate#printDate()}.
     */
    @Test
    public void testPrintDate() {
        printDate.printDate();
    }

}
