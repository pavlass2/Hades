using Hades.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Data
{
    public class DbDataProvider
    {
        private ApplicationDbContext applicationDbContext;
        private UserManager<ApplicationUser> userManager;

        public DbDataProvider(ApplicationDbContext applicationDbContext, UserManager<ApplicationUser> userManager)
        {
            this.applicationDbContext = applicationDbContext;
            this.userManager = userManager;
        }

        /// <summary>
        /// Adds a new user and a group (supposedly with him as a founder).
        /// </summary>
        /// <param name="group">Group to add.</param>
        /// <param name="groupFounder">Groups founder (who is already added in Group as founder).</param>
        /// <returns>ApplicationUser which was created as a founder</returns>
        public async Task<ApplicationUser> CreateGroupAsync(Group group, ApplicationUser groupFounder)
        {
            ApplicationUser applicationUser = await AddAplicationUserAsync(groupFounder);
            await applicationDbContext.AddAsync(group);

            await applicationDbContext.SaveChangesAsync();

            return applicationUser;

        }

        /// <summary>
        /// Gets a group.
        /// </summary>
        /// <param name="groupName">Name of the group to get.</param>
        /// <returns>Founded group.</returns>
        public Group GetGroup(string groupName)
        {
            return applicationDbContext.Groups.Include("Founder").FirstOrDefault(g => g.Name.Equals(groupName));
        }

        /// <summary>
        /// Checks if group already exists.
        /// </summary>
        /// <param name="groupName">Name of the group to check.</param>
        /// <returns></returns>
        public bool DoesGroupExist(string groupName)
        {
            if (GetGroup(groupName) == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }


        /// <summary>
        /// Creates new user with a userName "generated" from his nickname.
        /// </summary>
        /// <param name="applicationUser">Application user to add.</param>
        /// <returns>ApplicationUser which was created</returns>
        public async Task<ApplicationUser> AddAplicationUserAsync(ApplicationUser applicationUser)
        {
            // Use NickName as UserName.
            string consideredUserName = applicationUser.NickName;
            int counter = 0;
            // If this username is already taken, add number.
            while (await userManager.FindByEmailAsync(consideredUserName) != null)
            {
                // Try it again but with a number.
                consideredUserName = applicationUser.NickName + counter.ToString();
                
                // If we run this again, we need the number incremented to try another username variant.
                counter++;
            }
            applicationUser.UserName = consideredUserName;
            await userManager.CreateAsync(applicationUser);

            return await userManager.FindByNameAsync(applicationUser.UserName);
        }

        /// <summary>
        /// Adds an ApplicationUser and adds him as a student to a group
        /// </summary>
        /// <param name="student">Student to add.</param>
        /// <param name="groupName">Group name to add the student to.</param>
        /// <returns>ApplicationUser which was created as a student</returns>
        public async Task<ApplicationUser> AddStudentToAGroupAsync(ApplicationUser student, string groupName)
        {
            Group group = GetGroup(groupName);
            ApplicationUser addedStudent = await AddAplicationUserAsync(student);
            
            StudentGroup studentGroup = new StudentGroup
            {
                Group = group,
                GroupId = group.GroupId,
                Student = addedStudent,
                StudentId = addedStudent.Id
            };

            applicationDbContext.StudentGroup.Add(studentGroup);           
            await applicationDbContext.SaveChangesAsync();
            return addedStudent;
        }

        public async Task AddMessageAsync(Message message)
        {
            applicationDbContext.Messages.Add(message);
            await applicationDbContext.SaveChangesAsync();
        }

        public IQueryable<ApplicationUser> GetGroupStudents(Group group)
        {
            IQueryable<StudentGroup> studentGroup = applicationDbContext.StudentGroup.Where(
                sg => sg.GroupId == group.GroupId);
            IQueryable<ApplicationUser> students = applicationDbContext.Users.Where(
                u => studentGroup.Select(
                    sg => sg.StudentId).Contains(u.Id));

            return students;
        }
        
        public IQueryable<Message> GetGroupMessages(Group group)
        {
            return applicationDbContext.Messages.Where(m => m.PostedInGroup.GroupId == group.GroupId);
        }
    }
}
