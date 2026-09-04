import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public class Solution {

  public static void main(String[] args) {
    switch (args[0]) {
      case "1" -> solve1();
      case "2" -> solve2();
      default -> System.out.println("Invalid argument: " + args[0]);
    }
  }

  private static void solve1() {
    Path path = Path.of("2015/01_lisp/data/input1.txt").toAbsolutePath();

    try (Stream<String> lines = Files.lines(path)) {
      int answer = lines
        .flatMapToInt(String::chars)
        .map(c -> c == '(' ? 1 : -1)
        .sum();
      System.out.println(answer);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private static void solve2() {
    Path path = Path.of("2015/01_lisp/data/input1.txt").toAbsolutePath();

    try {
      String content = Files.readString(path);
      int sum = 0;
      for (int index = 0; index < content.length(); index++) {
        sum += content.charAt(index) == '(' ? 1 : -1;

        if (sum == -1) {
          System.out.println(index + 1);
          break;
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
