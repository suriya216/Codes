import java.util.*;

public class Main
{
    public static void nextGreater(int[] arr, int n){
        int[] res=new int[n];
        
        for(int i=0;i<n;i++){
            int pres=arr[i];
            int next=0;
            for(int j=i+1;j<n;j++){
                if(arr[j]>pres && next<arr[j]){
                    next=arr[j];
                    break;
                }
            }
            res[i]=next;
        }
        
        for(int i=0;i<n;i++){
            System.out.print(res[i]+" ");
        }
    }
	public static void main(String[] args) {
	    Scanner sc=new Scanner(System.in);
	    int N=sc.nextInt();
	    
	    int []arr=new int[N];
	    
	    for(int i=0;i<N;i++){
	        arr[i]=sc.nextInt();
	    }
	    
	    nextGreater(arr, N);
	}
}
