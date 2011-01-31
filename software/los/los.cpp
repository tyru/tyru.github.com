/* vim:ts=4:sw=4:sts=0:tw=0:set et: */
/* 
 * los.cpp - launch exe on windows startup
 *
 * Written By: tyru <tyru.exe@gmail.com>
 * Last Change: 2009-07-12.
 *
 */


#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

#include <cstdio>
#include <cstdlib>
#include <windows.h>
#include <shlwapi.h>
#pragma comment(lib, "shlwapi.lib")

using namespace std;




int
run(const string& confpath) {
    ifstream f(confpath.c_str());
    if (! f.is_open()) {
        // perror(confpath.c_str());
        cerr << confpath
             << "が見つかりません"
             << endl
             << endl
             << "終了するにはエンターを押して下さい..."
             << flush;
        getchar();
        return EXIT_FAILURE;
    }


    PROCESS_INFORMATION pi;
    STARTUPINFO si;
    GetStartupInfo(&si);
    string line;

    while (getline(f, line)) {
        if (line.empty())
            continue;
        else if (line.at(0) == '#')
            continue;

        string::size_type pos = line.find(" ");
        pos = pos == string::npos ?
                line.size() - 1 : pos;

        string command = line.substr(0, pos); 
        string arg = line.substr(pos + 1);
        if (command == "echo") {
            cout << arg << endl;

        } else if (command == "wait") {
            stringstream ss;
            DWORD ms;
            ss << arg;
            ss >> ms;
            Sleep(ms * 1000);

        } else if (command == "open") {
            // delete double quotes
            const char *arg_p = arg.c_str();
            PathUnquoteSpaces((LPSTR)arg_p);
            arg = string(arg_p);

            // get working directory of arg
            string wd = PathFindFileName(arg.c_str());
            wd = arg.substr(0, arg.size() - wd.size());

            BOOL succeeded = CreateProcess(NULL,
                          (LPSTR)arg.c_str(),
                          NULL,
                          NULL,
                          FALSE,
                          NORMAL_PRIORITY_CLASS | CREATE_NEW_PROCESS_GROUP,
                          NULL,
                          (LPSTR)wd.c_str(),
                          &si,
                          &pi);

            if (! succeeded) {
                LPVOID lpMsgBuf;
                FormatMessage(
                    FORMAT_MESSAGE_ALLOCATE_BUFFER |
                    FORMAT_MESSAGE_FROM_SYSTEM |
                    FORMAT_MESSAGE_IGNORE_INSERTS,
                    NULL,
                    GetLastError(),
                    MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
                    (LPTSTR) &lpMsgBuf,
                    0,
                    NULL
                );
                cerr << (const char*)lpMsgBuf << endl;
            }

        }
    }

    return EXIT_SUCCESS;
}


int
main(int argc, char **argv) {

    ios::sync_with_stdio();

    string confpath;
    if (*(++argv) == NULL) {
        confpath = "startup.conf";
    } else {
        confpath = *argv;
    }

    return run(confpath);
}
