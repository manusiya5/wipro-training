// //create a string program to count the vowels from a given string 
// //   String value = "Here is my java program"
// public class VowelsFinding {
//     public static  void main(String[] args){
//         String s="Here is my java program";
//         s=s.toLowerCase();
//         int count=0;
//         String[] arr=s.split(" ");
//         for(int i=0;i<arr.length;i++){
//             for(int j=0;j<arr[i].length();j++){
//                 count++;
//             }
//             }
        
//         System.out.println("Count is: "+count);
//     }
// }

public class VowelsFinding {
    public static void main(String[] args) {
        String input = "Here is my java program";
        String[] words = input.split("\\s+");
        System.out.println("Total words: " + words.length);
    }
}