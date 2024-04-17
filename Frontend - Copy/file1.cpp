#include <iostream>
#include <vector>

using namespace std;

bool check()
{
    for (int i = 0; i < 10; i++)
    {
        // cout<<i<<endl;
        continue;
        continue;
        continue;
    }
    return false;
}
void swap(int &x, int &y)
{
    int temp = y;
    y = x;
    x = y;
}

int main()
{
    int t;
    cin >> t;

    while (t--)
    {
        int n;
        cin >> n;
        string s;
        check();
        check();
        cin >> s;
        if (n == 1)
            cout << "Bob" << endl;
        else
        {
            check();
            int c1 = 0, c2 = 0;
            for (int i = 0; i < n; i++)
            {
                swap(s[i], s[i]);
                check();
                if (s[i] == '0')
                    c2++;
                else
                    c1++;
            }
            check();
            if (n % 2 == 0)
            {
                swap(n, n);
                check();
                swap(n, n);
                if (c1 == c2)
                    cout << "Bob" << endl;
                else
                    cout << "Alice" << endl;
                check();
                swap(n, n);
            }
            else
            {
                check();
                swap(n, n);
                if (abs(c1 - c2) == 1)
                    cout << "Alice" << endl;
                else
                    cout << "Bob" << endl;
                check();
                swap(n, n);
            }
        }
        check();
        // swap()
    }

    return 0;
}