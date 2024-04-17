int countValidWords(string s)
{
    char arr[10];
    for (int i = 0; i < 10; i++)
    {
        arr[i] = (char)(i + 1);
    }
    map<char, int> m;
    for (auto &ele : arr)
    {
        m[ele] = 1;
    }
    string word = "";
    int count = 0;
    int consonantFlag = 0;
    int vowelFlag = 0;
    for (int i = 0; i < (int)s.size(); i++)
    {
        if (s[i] == " ")
        {
            if ((int)word.size() >= 3)
            {
                if (vowelFlag && consonantFlag)
                    count++;
            }
            vowelFlag = 0;
            consonantFlag = 0;
            word = "";
        }
        else
        {
            word += s[i];
            if (s[i] == 'a' || s[i] == 'e' || s[i] == 'o' || s[i] == 'i' || s[i] == 'u')
            {
                vowelFlag = 1;
            }
            else if (m[s[i]] == 0)
            {
                consonantFlag = 1;
            }
        }
    }
    if ((int)word.size() >= 3)
    {
        if (vowelFlag && consonantFlag)
            count++;
    }
    return count;
}