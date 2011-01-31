#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use constant {
    MAX_TERM_WIDTH => 42
};

use Win32::Die;
use Win32::Process;
use Win32;

use File::Basename 'dirname';
use File::Spec;
use FileHandle;
use Perl6::Say;
use Term::Getch;
use Time::HiRes 'sleep';


### FUNCTIONS ###
sub run {
    my @args = @_ or die;

    # 0�ł͂Ȃ�NULL���w�肷�邱��
    ### Modification of a read-only value attempted at launch_at_boot.pl ###
    Win32::Process::Create(
        NULL,
        $args[0],
        join(' ', @args),
        0, NORMAL_PRIORITY_CLASS | CREATE_NEW_PROCESS_GROUP,
        dirname($args[0]));
}

sub errmsg { Win32::FormatMessage(Win32::GetLastError()) }

sub split_args {
    my $path = shift;
    my @args;

    while ($path) {
        next    if $path =~ s/^\s+//;

        if ($path =~ s/^"(.*?)"//) {
            push @args, $1;
        } elsif ($path =~ s/^([^&\(\)\[\]\{\}\^=;!'\+,`~ ]+)//) {
            push @args, $1;
        } else {
            die "### [$path] ###";
        }
    }

    return @args;
}


### MAIN ###
my $FH;
my @inc_path = ($ENV{HOME}, '.');
for my $inc (@inc_path) {
    my $file = File::Spec->catfile($inc, '.startuprc');
    if (-f $file) {
        $FH = FileHandle->new($file);
        if (defined $FH) {
            last;
        } else {
            die "error: can't open $file\n";
        }
    }
}

die "error: can't open config file...\n"    unless defined $FH;


while (defined(my $line = <$FH>)) {
    next    if $line =~ /^\s*(#.*)?$/;

    # do something if key pressed
    if (defined(my $c = getch)) {
        if ($c eq 'p') {    # pause
            warn "[msg]### pause... ###\n";
            sleep 50    while( not defined getch() );
            warn "[msg]### wake up... ###\n";
        } elsif ($c eq 'q') {    # quit
            exit;
        }
    }


    if ($line =~ /^\s*open\s+(.+)$/) {
        if ($1) {
            my @args = split_args($1);
            run(@args) or warn "### " . errmsg() . " ###\n";
        } else {
            warn "error: $.: no arguments.\n";
        }

    } elsif ($line =~ /^\s*wait\s+(.+)$/) {
        sleep $1;

    } elsif ($line =~ /^\s*echo\s*(.*)$/) {
        say $1;

    } else {
        # syntax error
        warn sprintf "syntax error:\n  [%s]",
                     substr($line, 0, MAX_TERM_WIDTH);
    }
}

