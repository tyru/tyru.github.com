import javax.swing.*;

public class HelloWorld extends JApplet {

    private JLabel label;

    public void init() {
        this.label = new JLabel("hello world");
        this.getContentPane().add(this.label);
    }


    // JavaScriptからアクセスするコード
    public void setName(String name) {
        String str = "Hello, " + name;
        this.label.setText(str);
    }
    public String getName() {
        return this.label.getText();
    }
}
