//Write a program for bankaccount to know the balance after depositing and withdrawing the amount 
// and also having the loan account facilitiy to calculate the emi and monthly emi's will be
//paid by customer using either by card or cash



import java.util.*;
public class OopsConcept {

    private int id;
    private String name;
    private double balance;

    
    public int getId() {
        return id;
    }
 
    public String getName() {
        return name;
    }
    public void setName(String name) {
        
        this.name = name;
    }
   
   
    public  void deposit(double amount)
    {
        if(amount>0)
        {
            balance += amount;
        }
    }
     public  void withdraw(double amount)
    {
        if(amount>0)
        {
            balance -= amount;
        }
    }
    public double getBalance() {
        return balance;
    }

    public static void main(String[] ar)
    {
        Scanner sc=new Scanner(System.in);
       
        OopsConcept obj = new OopsConcept();
         System.out.println("Enter your Name: ");
         String name=sc.nextLine();
         obj.setName(name);
        System.out.println("Enter your Deposit Amt: ");
       
       int depAmt=sc.nextInt();
        obj.deposit(depAmt);
        System.out.println("Hi!" + obj.getName() +" After depositing the updated Balance is: " + obj.getBalance());
        System.out.println("Enter your Withdraw Amt: ");
         int withAmt=sc.nextInt();
        obj.withdraw(withAmt);
        System.out.println("Hi! " + obj.getName() +"After withdrawing the updated Balance is: " + obj.getBalance());
    
    }
    
}